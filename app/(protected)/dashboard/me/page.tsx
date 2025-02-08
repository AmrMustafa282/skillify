const Me = async () => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
 return <div>Me</div>;
};

export default Me;
