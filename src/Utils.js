function gerarCor(opacidade = 1) {
  let r = parseInt(Math.random() * 255);
  let g = parseInt(Math.random() * 255);
  let b = parseInt(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}
