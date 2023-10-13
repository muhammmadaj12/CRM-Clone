<template>
    <footer class="custom-footer">
      <div class="container">
        <div class="row">
          <div class="left">
            <h5 class="mb-3" style="letter-spacing: 2px; color: #818963;">InsightHub</h5>
            <p>
              Our website services are designed to empower your online presence. 
              We offer a comprehensive range of solutions to meet your digital needs, from stunning web design and development to robust e-commerce solutions. 
              Whether you're a startup looking to establish your brand or an established business aiming to enhance your online reach.
            </p>
          </div>
          <div class="center">
            <h5 class="mb-3" style="letter-spacing: 2px; color: #818963;">Links</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#!" style="color: #4f4f4f;">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="#!" style="color: #4f4f4f;">Delivery</a>
              </li>
              <li>
                <a href="#!" style="color: #4f4f4f;">Pricing</a>
              </li>
              <li>
                <a href="#!" style="color: #4f4f4f;">Where we deliver?</a>
              </li>
            </ul>
          </div>
          <div class="right">
            <h5 class="mb-1" style="letter-spacing: 2px; color: #818963;">Opening Hours</h5>
            <table class="table" style="color: #4f4f4f; border-color: #666;">
              <tbody>
                <tr>
                  <td style="background-color: rgb(101, 101, 101);">Mon - Fri:</td>
                  <td style="background-color: rgb(101, 101, 101);">8am - 9pm</td>
                </tr>
                <tr>
                  <td style="background-color: rgb(101, 101, 101);">Sat - Sun:</td>
                  <td style="background-color: rgb(101, 101, 101);">8am - 1am</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="text-center py-3">
              &copy; {{ new Date().getFullYear() }} Copyright
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .custom-footer {
    background-color: #deded5;
  }
.custom-footer {
  background-color: #deded5;
  padding: 20px 0; /* Adjust the padding as needed */
  color: #4f4f4f; /* Text color for links and text */
}

.custom-footer h5 {
  letter-spacing: 2px;
  color: #818963;
}

.custom-footer a {
  color: #4f4f4f;
  text-decoration: none;
}

.custom-footer a:hover {
  text-decoration: underline;
}

.custom-footer .container {
  max-width: 1200px; /* Adjust the maximum width as needed */
}

.custom-footer ul {
  list-style: none;
  padding: 0;
}

.custom-footer ul li {
  margin-bottom: 10px;
}

.custom-footer table {
  width: 100%;
  border-collapse: collapse;
}

.custom-footer table, .custom-footer table td {
  border: 1px solid #666;
}

.custom-footer hr {
  border-top: 1px solid #666;
}

.custom-footer .text-center {
  text-align: center;
  padding: 15px 0;
  background-color: rgba(0, 0, 0, 0.2);
  color: #4f4f4f;
  font-weight: bold;
}
.left
{
    width: 30%;
    height: 100%;
}
.center
{
    width: 30%;
    height: 100%;
}
.right
{
    width: 30%;
    height: 100%;
}
.row
{
    display: flex;
    justify-content: space-evenly;
}
.custom-footer .container[data-v-d1ee5111] {
    max-width: 100%;
}
.custom-footer[data-v-d1ee5111] {
    background-color: rgb(101, 101, 101);
    color: #ffffff;
}

.custom-footer ul[data-v-d1ee5111] {
    color: #ffffff;
}
a{
    color: white !important;
}
td{
    color: white !important;
}
.text-center
{
    color: white !important;
}
.custom-footer .text-center[data-v-d1ee5111]
{
    background-color: rgb(101, 101, 101) !important;
}
.custom-footer hr[data-v-d1ee5111] {
  border-top: none;
}
hr {
    margin: 0rem;
    opacity: 0;
}
</style>