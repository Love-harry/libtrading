<!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> -->


    <div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3">
                    <i class="fas fa-user-plus"></i> Register
                </h1>
                <% include ./partials/messages %>
                    <form action="/users/register" method="POST">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="name" id="name" name="name" class="form-control" placeholder="Enter Name"
                                value="<%= typeof name != 'undefined' ? name : '' %>" />
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" class="form-control" placeholder="Enter Email"
                                value="<%= typeof email != 'undefined' ? email : '' %>" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" class="form-control"
                                placeholder="Create Password"
                                value="<%= typeof password != 'undefined' ? password : '' %>" />
                        </div>
                        <div class="form-group">
                            <label for="password2">Confirm Password</label>
                            <input type="password" id="password2" name="password2" class="form-control"
                                placeholder="Confirm Password"
                                value="<%= typeof password2 != 'undefined' ? password2 : '' %>" />
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">
                            Register
                        </button>
                    </form>
                    <p class="lead mt-4">Have An Account? <a href="/users/login">Login</a></p>
            </div>
        </div>
    </div>



    // profile update put request...
    router.post('/update/:id', (req, res) => {
    let id = req.params.id;
    let new_image = '';
    
    if (req.file) {
    new_image = req.file.filename;
    try {
    fs.unlinkSync('./uploads' + req.body.old_image);
    } catch (err) {
    console.log(err);
    }
    } else {
    new_image = req.body.old_image;
    }
    
    User.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: new_image,
    },
    (err, result) => {
    if (err) {
    res.json({ message: err.message, type: 'denger' });
    } else {
    req.session.message = {
    type: 'success',
    message: 'Your profile has been updated',
    };
    res.redirect('/profile');
    }
    })
    });

    // upload image
    var storage = multer.diskStorage({
    description: function (req, file, cb) {
    cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
    });
    
    var upload = multer({
    storage: storage,
    }).single("image");




    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>