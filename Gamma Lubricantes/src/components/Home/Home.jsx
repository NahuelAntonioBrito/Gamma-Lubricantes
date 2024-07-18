import ItemListContainer from "../ItemListContainer/ItemListContainer";

const Home = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <ItemListContainer />
    </div>
  );
};

export default Home;
