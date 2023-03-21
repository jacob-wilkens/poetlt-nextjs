import NextHead from 'next/head';

const Head = () => {
  return (
    <NextHead>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      {/* The page supports both dark and light color schemes, and the page author prefers / default is light. */}
      <meta name='color-scheme' content='light dark' />
    </NextHead>
  );
};

export default Head;
