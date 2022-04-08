type HighlightProps = {
  label: string;
  tooltip?: string;
  value: string | number;
};

function Highlight({ label, value, tooltip }: HighlightProps) {
  return <div className="p-4">
    <span className="block font-light">{label}</span>
    <span className="block text-4xl" title={tooltip}>{value}</span>
  </div>
};

export default Highlight;