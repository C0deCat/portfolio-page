import "./Scanlines.styles.css"; // Assuming you have a CSS file for scanlines styles

const Scanlines: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  if (!enabled) {
    return null;
  }

  return <div className="fixed inset-0 pointer-events-none z-[999] scanlines" />;
};

export default Scanlines;
