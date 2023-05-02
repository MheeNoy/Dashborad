const formData = new FormData();
const fileField = document.querySelector('input[type="text"]');

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

const request = new Request('/myEndpoint', {
  method: 'POST',
  body: formData
});

request.formData().then((data) => {
  // do something with the formdata sent in the request
});

