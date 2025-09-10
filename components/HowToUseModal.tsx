import React from 'react';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToUseModal: React.FC<HowToUseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-3xl leading-none text-gray-500 hover:text-gray-800"
          aria-label="閉じる"
        >
          &times;
        </button>
        <h2 className="mb-4 text-center text-xl font-bold text-orange-500">
          アプリの使い方
        </h2>
        <p className="mb-6 text-center text-gray-600">
          このアプリは、ホーム画面に追加して利用することを想定しています。追加すると、通常のアプリのようにワンタップで素早く起動でき、より快適にご利用いただけます。
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              iPhone (Safari) の場合
            </h3>
            <ol className="list-inside list-decimal space-y-2 text-gray-700">
              <li>
                画面下にある <span className="font-bold">共有アイコン</span>{' '}
                (四角と上矢印)をタップします。
              </li>
              <li>
                メニューをスクロールして
                <span className="font-bold">「ホーム画面に追加」</span>
                を選択します。
              </li>
              <li>
                右上の<span className="font-bold">「追加」</span>
                をタップすると完了です。
              </li>
            </ol>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Android (Chrome) の場合
            </h3>
            <ol className="list-inside list-decimal space-y-2 text-gray-700">
              <li>
                画面右上にある <span className="font-bold">メニューボタン</span>{' '}
                (︙) をタップします。
              </li>
              <li>
                メニューから
                <span className="font-bold">「ホーム画面に追加」</span>または
                <span className="font-bold">「アプリをインストール」</span>
                を選択します。
              </li>
              <li>
                <span className="font-bold">「追加」</span>
                をタップすると完了です。
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            データの管理について
          </h3>
          <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
            <li>
              このアプリの記録データは、お使いのブラウザ内に保存されます。
            </li>
            <li className="font-bold text-red-600">
              ブラウザのキャッシュやサイトデータを削除すると、記録もすべて消去されますのでご注意ください。
            </li>
            <li>
              データを全て消去したい場合は、ブラウザのキャッシュ削除を行ってください。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowToUseModal;
