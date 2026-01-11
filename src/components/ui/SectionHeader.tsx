import React from 'react';

interface SectionHeaderProps {
  label?: string;
  titlePrimary: string;
  titleAccent?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  titlePrimary,
  titleAccent,
  className = ''
}) => {
  return (
    <div className={`text-left space-y-6 mb-32 ${className}`}>
      {label && (
        <span className="text-[#3b82f6] font-bold uppercase tracking-[0.6em] text-[10px] block">
          {label}
        </span>
      )}
      <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white uppercase">
        {titlePrimary}
        {titleAccent && (
          <>
            <br />
            <span className="italic text-white/15">{titleAccent}</span>
          </>
        )}
      </h2>
    </div>
  );
};

export default SectionHeader;
