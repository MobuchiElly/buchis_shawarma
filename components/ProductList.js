import ShawarmaCard from "./ShawarmaCard";

const ProductList = ({ shawarmaList }) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ padding: "20px 10px" }}
    >
      <h1 className="text-center text-3xl md:text-4xl font-bold">
        PRODUCT CATALOG
      </h1>
      <h2 className="text-center text-2xl font-semibold">
        Healthy and Nutritious!!!
      </h2>
      <p className="text-center w-90% lg:w-70% text-lg text-#444">
        Whether you prefer chicken, beef, lamb, or vegetarian options, our
        diverse menu caters to all tastes. Customize your Shawarma with a choice
        of fresh toppings and sauces, creating a personalized culinary
        experience.
      </p>
      <div className="container flex justify-center flex-wrap lg:flex-nowrap p-2">
        {shawarmaList.map((val) => (
          <div className=" bg-slate-50 m-1 rounded-md" key={val._id}>
            <ShawarmaCard shawarma={val} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;