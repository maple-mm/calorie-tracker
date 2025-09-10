import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCalorie } from '../context/CalorieDataContext';

const RecordPage: React.FC = () => {
  const { date: dateParam } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { saveCalorieData, getCalorieDataForDate, getLastBasalMetabolism } =
    useCalorie();

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [date, setDate] = useState(dateParam || getToday());
  const [intake, setIntake] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [basalMetabolism, setBasalMetabolism] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const targetDate = dateParam || getToday();
    const today = getToday();

    if (targetDate > today) {
      navigate('/record', { replace: true });
      return;
    }

    setDate(targetDate);
    const existingData = getCalorieDataForDate(targetDate);
    if (existingData) {
      setIntake(String(existingData.intake));
      setExpenditure(String(existingData.expenditure));
      setBasalMetabolism(String(existingData.basalMetabolism || ''));
    } else {
      setIntake('');
      setExpenditure('');
      const lastBasal = getLastBasalMetabolism();
      setBasalMetabolism(lastBasal ? String(lastBasal) : '');
    }
  }, [dateParam, getCalorieDataForDate, getLastBasalMetabolism, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (date > getToday()) {
      setMessage('未来の日付には記録できません。');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const errorMessages: string[] = [];
    if (!intake) {
      errorMessages.push('摂取カロリーを入力してください。');
    }
    if (!expenditure) {
      errorMessages.push('消費カロリーを入力してください。');
    }
    if (!basalMetabolism) {
      errorMessages.push('基礎代謝を入力してください。');
    }

    if (errorMessages.length > 0) {
      setMessage(errorMessages.join('\n'));
      return;
    }

    const intakeNum = parseInt(intake, 10);
    const expenditureNum = parseInt(expenditure, 10);
    const basalMetabolismNum = parseInt(basalMetabolism, 10);

    if (
      isNaN(intakeNum) ||
      isNaN(expenditureNum) ||
      isNaN(basalMetabolismNum) ||
      intakeNum < 0 ||
      expenditureNum < 0 ||
      basalMetabolismNum < 0
    ) {
      setMessage('有効な数値を入力してください。');
      return;
    }

    saveCalorieData(date, intakeNum, expenditureNum, basalMetabolismNum);
    setMessage('保存しました！');

    if (!dateParam || dateParam === getToday()) {
      setIntake('');
      setExpenditure('');
    }

    setTimeout(() => {
      setMessage('');
      if (dateParam) {
        navigate('/calendar');
      }
    }, 1500);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate > getToday()) {
      return;
    }
    navigate(`/record/${newDate}`);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-center text-2xl font-bold text-orange-500">
        記録
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl bg-white p-6 shadow-md"
      >
        <div>
          <label
            htmlFor="date"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            日付
          </label>
          <input
            type="date"
            id="date"
            value={date}
            max={getToday()}
            onChange={handleDateChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label
            htmlFor="intake"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            🍔 摂取カロリー (kcal)
          </label>
          <input
            type="number"
            id="intake"
            value={intake}
            onChange={(e) => setIntake(e.target.value)}
            placeholder="例: 1800"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label
            htmlFor="expenditure"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            🔥 消費カロリー (kcal)
          </label>
          <input
            type="number"
            id="expenditure"
            value={expenditure}
            onChange={(e) => setExpenditure(e.target.value)}
            placeholder="例: 500"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label
            htmlFor="basalMetabolism"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            🏃 基礎代謝 (kcal)
          </label>
          <input
            type="number"
            id="basalMetabolism"
            value={basalMetabolism}
            onChange={(e) => setBasalMetabolism(e.target.value)}
            placeholder="例: 1200"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-orange-400 py-3 font-bold text-white shadow-md transition-colors hover:bg-orange-500"
        >
          保存する
        </button>
        {message && (
          <p
            className={`whitespace-pre-line mt-4 text-center text-sm ${
              message === '保存しました！'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default RecordPage;
