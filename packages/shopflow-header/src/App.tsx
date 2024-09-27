import { Header } from "./components";

function App() {
  return (
    <>
      <Header
        isSidebarOpen={false}
        setSidebar={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
}

export default App;
