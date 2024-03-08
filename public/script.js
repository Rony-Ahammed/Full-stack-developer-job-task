$(document).ready(function () {
  $.ajax({
    url: "http://numbersapi.com/1/30/date?json",
    dataType: "json",
    success: function (data) {
      $("#fitness-info").html("<p>" + data.text + "</p>");
    },
  });

  $("#imageInput").change(function () {
    var formData = new FormData();
    var file = $(this)[0].files[0];
    formData.append("file", file);

    $.ajax({
      url: "/upload",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        console.log("Image uploaded successfully");
      },
      error: function (xhr, status, error) {
        console.error("Failed to upload image:", error);
      },
    });
  });

  $("#dropzone").click(function () {
    $("#imageInput").click();
  });

  $("#user-form").submit(function (event) {
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      url: "/addUser",
      type: "POST",
      data: formData,
      success: function (response) {
        console.log("User added successfully");
        $("#message").html(
          "<div class='alert alert-success' role='alert'>User added successfully</div>"
        );
      },
      error: function (xhr, status, error) {
        console.error("Failed to add user:", error);
        $("#message").html(
          "<div class='alert alert-danger' role='alert'>Failed to add user</div>"
        );
      },
    });
  });

  Dropzone.autoDiscover = false;
  var myDropzone = new Dropzone("#dropzone", {
    url: "/upload",
    method: "post",
    acceptedFiles: "image/*",
    maxFiles: 5,
    maxFilesize: 5,
    parallelUploads: 5,
    autoProcessQueue: true,
    init: function () {
      this.on("error", function (file, errorMessage) {
        console.log("Error uploading file:", errorMessage);
      });
      this.on("success", function (file, response) {
        console.log("File uploaded successfully");
      });
    },
  });
});
