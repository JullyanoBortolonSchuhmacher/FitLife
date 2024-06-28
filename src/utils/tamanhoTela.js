const setColumnsBasedOnScreenSize = () => {
  const dimensTela = window.innerWidth;
  let columns =0;

  if (dimensTela >= 1024) {
    columns = 3; // Desktop
  } else if (dimensTela >= 600) {
    columns = 2; // Tablet
  } else {
    columns = 1; // Mobile
  }

  localStorage.setItem('colunas', columns.toString());
};

export default setColumnsBasedOnScreenSize;