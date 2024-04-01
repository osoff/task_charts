import Exchange from "./components/Exchange";

export default function Home() {
  return (
    <>
      <section className="max-w-96 md:max-w-screen-md lg:max-w-screen-lg mx-auto py-6 heroGrad lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
        <h1 className="text-2xl font-bold text-center mb-3">Курс валют</h1>
        <Exchange />
      </section>
    </>
  );
}
