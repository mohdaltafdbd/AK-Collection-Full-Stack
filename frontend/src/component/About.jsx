import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function AboutPage() {
    return (
      <div className='row p-5'>
    <MDBContainer>
      <MDBRow>
      <div className='row p-5 justify-content-center'>
        <MDBCol md='4'>
          <h2>About Us</h2>
          <p>
            Welcome to our online store! We are a dedicated team passionate about providing high-quality products and excellent customer service. Our goal is to make your shopping experience enjoyable and convenient.
          </p>
          <p>
            At our store, you'll find a wide range of products carefully selected to meet your needs. From electronics to fashion, home decor to sporting goods, we strive to offer a diverse selection to cater to different tastes and preferences.
          </p>
          <p>
            Customer satisfaction is our top priority. We value your feedback and continuously work to improve our services. If you have any questions, concerns, or suggestions, please don't hesitate to contact our customer support team.
          </p>
        </MDBCol>
        </div>
      </MDBRow>
    </MDBContainer>
          </div>
  );
}
