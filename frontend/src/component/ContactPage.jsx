import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInputGroup, MDBBtn } from 'mdb-react-ui-kit';

export default function ContactPage() {
  return (
    <div className='row p-5'>
    <div className='row p-5'>
    <MDBContainer>
      <MDBRow>
        <MDBCol md='6'>
          <h2>Contact Us</h2>
          <p>
            We would love to hear from you! If you have any questions, feedback, or inquiries, please don't hesitate to get in touch with us using the contact form below or the provided contact information.
          </p>
          <form>
            <MDBInputGroup className='mb-3'>
              <input type='text' placeholder='Your Name' />
            </MDBInputGroup>
            <MDBInputGroup className='mb-3'>
              <input type='email' placeholder='Your Email' />
            </MDBInputGroup>
            <MDBInputGroup className='mb-3'>
              <textarea rows='5' placeholder='Your Message'></textarea>
            </MDBInputGroup>
            <MDBBtn color='primary'>Submit</MDBBtn>
          </form>
        </MDBCol>
        <MDBCol md='6'>
          <h4>Contact Information</h4>
          <p>
            <strong>Address:</strong> 123 Main St, City, State, ZIP
          </p>
          <p>
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
          <p>
            <strong>Email:</strong> info@example.com
          </p>
          <p>
            <strong>Working Hours:</strong> Monday - Friday: 9:00 AM - 5:00 PM
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div></div>
  );
}
