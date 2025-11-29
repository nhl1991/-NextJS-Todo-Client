export default function UpdateComponent() {
  return (
    <article className="flex flex-col bg-white shadow-2xl max-w-2xl w-full min-h-96 px-8 py-4 rounded-xl gap-4">
      <h3 className="text-xl font-bold">{username}&apos;s Todo</h3>
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="font-bold">
          TODO タイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          className="inputField"
          placeholder="Title Input"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="content" className="font-bold">
          TODO 内容
        </label>
        <textarea
          rows={5}
          cols={50}
          id="content"
          value={content}
          className=""
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-between p-2">
        <div
          className={`flex gap-2 font-bold text-base text-white px-3 py-1.5 cursor-pointer rounded-xl ${
            isPublic ? "bg-sky-400" : "bg-slate-400"
          }`}
        >
          <input id="public" className="" type="checkbox" />
          <label htmlFor="public">公開</label>
        </div>
        <button className="btn-hover" onClick={handleOnCreate}>
          登録
        </button>
      </div>
    </article>
  );
}
