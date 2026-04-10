function SectionHeader({ eyebrow, title, note, action }) {
  return (
    <div className="flex items-start justify-between border-b border-gray-100 pb-6 mb-6">
      <div>
        {eyebrow && <p className="text-xs font-bold tracking-wider text-primary uppercase mb-1">{eyebrow}</p>}
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        {note && <p className="text-sm text-gray-500 mt-1 max-w-lg">{note}</p>}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

export default SectionHeader;
