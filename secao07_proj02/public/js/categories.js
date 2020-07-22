function confirmExclusion (e, form) {
  e.preventDefault();
  
  let decision = confirm("Confirmar a exclusão desta categoria?");

  if (decision) {
    form.submit();
  }
}