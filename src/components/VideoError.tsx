export default function VideoError(): JSX.Element {
  return (
    <div className="inset-0 absolute aspect-video bg-light-24dp rounded-md dark:bg-dark-24dp grid place-items-center shadow-inner">
      <span className="material-icons !text-6xl text-light-00dp dark:text-dark-04dp">
        error_outline
      </span>
    </div>
  );
}
