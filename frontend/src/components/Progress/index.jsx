const Progress = ({ percentage }) => {
  let color = '#74BC82';
  if (percentage < 80 && percentage >= 60) {
    color = '#85D284';
  }

  if (percentage < 60 && percentage >= 40) {
    color = '#FAD378';
  }

  if (percentage < 40 && percentage >= 20) {
    color = '#FFB25A';
  }

  if (percentage < 25) {
    color = '#FF6665';
  }
  return (
    <div
      style={{
        width: '100%',
        height: 12,
        borderRadius: 10,
        border: '0.5px solid #dedede',
      }}
    >
      <div
        style={{
          width: `${percentage || 0}%`,
          backgroundColor: color,
          height: '100%',
          borderRadius: 10,
        }}
      ></div>
    </div>
  );
};

export default Progress;
