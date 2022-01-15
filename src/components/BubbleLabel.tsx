type Props = {
  text: String;
};

export default function BubbleLabel(props: Props): JSX.Element {
  return (
    <button className="text-xs">
      {props.text}
    </button>
  );
}
