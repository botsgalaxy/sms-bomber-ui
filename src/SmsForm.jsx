import { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  ProgressBar,
} from "react-bootstrap";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SmsForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("+880");
  const [operator, setOperator] = useState("GrameenPhone");
  const [smsCount, setSmsCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [failureCount, setFailureCount] = useState(0);
  const [results, setResults] = useState([]);

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    const phonePattern = /^\+880\d{0,10}$/;
    if (phonePattern.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!phoneNumber.startsWith("+880") || phoneNumber.length !== 14) {
      alert(
        "Please enter a valid phone number starting with +880 and 10 digits after it."
      );
      return;
    }
    setSubmitting(true);
    setResults([]);
    setSuccessCount(0);
    setFailureCount(0);

    for (let i = 0; i < smsCount; i++) {
      try {
        // Simulate API request success
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a delay
        const isSuccess = Math.random() > 0.2; // 80% chance of success
        if (isSuccess) {
          setResults((prevResults) => [...prevResults, `Success ${i + 1}`]);
          setSuccessCount((prevCount) => prevCount + 1);
          toast.success(`SMS ${i + 1} sent successfully!`);
        } else {
          setResults((prevResults) => [...prevResults, `Failed ${i + 1}`]);
          setFailureCount((prevCount) => prevCount + 1);
          toast.error(`SMS ${i + 1} failed to send.`);
        }

        // Actual API request code (commented out)
        /*
        const response = await axios.post("https://api.example.com/send-sms", {
          phoneNumber,
          operator,
        });
        if (response.data.status === "success") {
          setResults((prevResults) => [...prevResults, `Success ${i + 1}`]);
          setSuccessCount((prevCount) => prevCount + 1);
          toast.success(`SMS ${i + 1} sent successfully!`);
        } else {
          setResults((prevResults) => [...prevResults, `Failed ${i + 1}`]);
          setFailureCount((prevCount) => prevCount + 1);
          toast.error(`SMS ${i + 1} failed to send.`);
        }
        */
      } catch (error) {
        setResults((prevResults) => [...prevResults, `Failed ${i + 1}`]);
        setFailureCount((prevCount) => prevCount + 1);
        toast.error(`SMS ${i + 1} failed to send.`);
      }
    }

    setSubmitting(false);
  };

  const resetForm = () => {
    setPhoneNumber("+880");
    setOperator("GrameenPhone");
    setSmsCount(1);
    setResults([]);
    setSuccessCount(0);
    setFailureCount(0);
  };

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={500}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={0}
        transition={Slide}
      />

      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md="6">
            <h2 className="text-center mb-4">
              <i className="fas fa-sms"></i> Send SMS
            </h2>
            {!submitting && results.length === 0 && (
              <Card className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formPhoneNumber" className="mb-3">
                    <Form.Label>
                      <i className="fas fa-phone-alt"></i> Phone Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number starting with +880"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formOperator" className="mb-3">
                    <Form.Label>
                      <i className="fas fa-network-wired"></i> Operator
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={operator}
                      onChange={(e) => setOperator(e.target.value)}
                      required
                    >
                      <option value="GrameenPhone">GrameenPhone</option>
                      <option value="Robi">Robi</option>
                      <option value="Banglalink" disabled>
                        Banglalink
                      </option>
                      <option value="Airtel" disabled>
                        Airtel
                      </option>
                      <option value="Teletalk" disabled>
                        Teletalk
                      </option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formSmsCount" className="mb-3">
                    <Form.Label>
                      <i className="fas fa-envelope"></i> SMS Count
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={smsCount}
                      onChange={(e) => setSmsCount(e.target.value)}
                      min="1"
                      max="200"
                      required
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-block"
                      style={{ margin: "10px 0" }}
                    >
                      <i className="fas fa-paper-plane"></i> Send SMS
                    </Button>
                  </div>
                </Form>
              </Card>
            )}

            {submitting && (
              <Card className="p-4 text-center">
                <h4 className="mb-4">
                  <i className="fas fa-spinner fa-spin"></i> Sending SMS...
                </h4>
                <ProgressBar
                  now={(results.length / smsCount) * 100}
                  label={`${parseInt((results.length / smsCount) * 100)}%`}
                />
                <p className="mt-3">
                  <span className="text-success">
                    <i className="fas fa-check-circle"></i> Success:{" "}
                    {successCount}
                  </span>
                </p>
                <p>
                  <span className="text-danger">
                    <i className="fas fa-times-circle"></i> Failure:{" "}
                    {failureCount}
                  </span>
                </p>
              </Card>
            )}

            {results.length > 0 && !submitting && (
              <Card className="p-4 text-center">
                <h4 className="mb-4">
                  <i className="fas fa-check-circle"></i> SMS Sending Completed
                </h4>
                <p>
                  <span className="text-success">
                    <i className="fas fa-check-circle"></i> Success:{" "}
                    {successCount}
                  </span>
                </p>
                <p>
                  <span className="text-danger">
                    <i className="fas fa-times-circle"></i> Failure:{" "}
                    {failureCount}
                  </span>
                </p>
                <Button
                  variant="secondary"
                  className="btn-block mt-3"
                  onClick={resetForm}
                >
                  <i className="fas fa-redo"></i> Try Again
                </Button>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SmsForm;
