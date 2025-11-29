import { useEffect } from "react";

export default function ConfirmModal({
  onConfirm,
  onCancel,
  title,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-black/50 flex items-center justify-center">
      <div className="shadow-2xl bg-zinc-200 rounded-xl max-w-md w-full h-64 flex flex-col items-center justify-between">
        <h1 className="text-2xl py-4">確認</h1>
        <div className="px-6">
          <p >
            <b className="px-2.5 py-1 rounded-xl bg-zinc-300">{title}</b>の件を完了しますか？
          </p>
        </div>
        <div className="flex gap-x-2 py-2">
          <button className="btn-hover" onClick={onConfirm}>
            はい
          </button>
          <button className="btn-hover" onClick={onCancel}>
            いいえ
          </button>
        </div>
      </div>
    </div>
  );
}
