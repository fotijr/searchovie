type TagsProps = {
  label: string;
  values: string[];
};

function Tags({ label, values }: TagsProps) {
  return <div className="p-4">
    <span className="block font-light mb-1">{label}</span>
    {values.map((t) => (
      <span key={t} className="text-lg mr-2 mb-2 px-3 py-0 border-2 border-ovieblue rounded-full inline-block">{t}</span>
    ))}
  </div>
};

export default Tags;