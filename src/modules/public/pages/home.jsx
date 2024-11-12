const Home = () => {
  return (<>
    <div className="w-full min-h-screen">
      <div className="w-full h-full flex flex-col">
        <div className="w-full items-center flex px-24 justify-center py-24">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-5xl font-bold text-black max-w-lg">
              Correo electrónico seguro, inteligente y fácil de usar
            </h1>
            <p className="text-lg font-normal text-gray-600 max-w-lg mt-5">Mejora tu productividad con Gmail, que ahora se integra con Google Chat, Google Meet y otros servicios, todos en un mismo lugar.</p>
          </div>
          <div className=" max-w-xl flex justify-center items-center p-4">
          <img src="asset1.png" alt="gmail" className="object-contain"/>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default Home;