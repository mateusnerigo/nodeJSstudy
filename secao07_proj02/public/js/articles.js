/* New */
tinymce.init({
  language: "pt_BR",
  selector: "#articleBody",
  plugins: [
    'advlist autolink link image lists print preview hr searchreplace wordcount fullscreen insertdatetime media save table paste emoticons'
  ],
  init_instance_callback: () => {
    tinymce.get("articleBody").setContent(document.getElementById('content').innerHTML);
  }
});

/* Delete */
function confirmExclusion(e, form) {
  e.preventDefault();

  let decision = confirm('Confirmar a exclusão deste artigo?');

  if (decision) {
    form.submit();
  }
}
