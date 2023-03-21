export const DirectionsModalBody = () => {
  return (
    <ul style={{ lineHeight: '225%' }}>
      <li>You get eight guesses, try any current NBA player!</li>
      <li>
        <mark className='green'>Green in any column</mark> indicates a match!
      </li>
      <li>
        <mark className='yellow'>Yellow in the team column</mark> indicates the mystery player at one point played for this team, but does not currently
      </li>
      <li>
        <mark className='yellow'>Yellow in the position column</mark> indicates a partial match to the mystery player&apos;s position
      </li>
      <li>
        <mark className='yellow'>Yellow in any other column</mark> indicates this attribute is within 2 (inches, years, numbers) of the mystery player
      </li>
      <li>If you get stuck, try enabling silhouette mode!</li>
      <li>A new mystery player every day!</li>
    </ul>
  );
};
