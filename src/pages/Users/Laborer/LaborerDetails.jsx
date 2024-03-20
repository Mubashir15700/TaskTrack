import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLaborer } from "../../../api/user/laborer";
import Address from "../../../components/Users/Address";
import ProfileCard from "../../../components/Users/ProfileCard";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";

export default function LaborerDetails() {
  const [laborer, setLaborer] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getLaborerDetails = async () => {
      try {
        const response = await getLaborer(id);
        if (response && response.status === 200) {
          setLaborer(response.laborer);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLaborerDetails();
  }, [id]);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <ProfileCard
              imageSrc={laborer.user?.profile}
              userId={laborer.user?._id}
              username={laborer.user?.username}
            />
            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-2">
                <Address
                  label={"Location"}
                  currentAddress={laborer.user?.location}
                  usage={"display-laborer"}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{laborer.user?.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{laborer.user?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Education</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{laborer?.education}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Known Languages</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {(Array.isArray(laborer?.languages) ? laborer.languages.join(", ") : laborer?.languages)}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Available Days</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {(Array.isArray(laborer?.avlDays) ? laborer.avlDays.join(", ") : laborer?.avlDays)}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Available Times</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {(Array.isArray(laborer?.avlTimes) ? laborer.avlTimes.join(', ') : laborer?.avlTimes)}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol >
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">Expertise</MDBCardText>
                    {laborer.fields && laborer.fields.map((field, index) => (
                      <div key={index}>
                        <MDBCardText className="mb-1" style={{ fontSize: "1rem" }}>{field.name}</MDBCardText>
                        <MDBCardText className="mb-1 text-muted" style={{ fontSize: ".77rem" }}>Number of Works Done Before: {field.worksDone}</MDBCardText>
                        <MDBCardText className="mb-1 text-muted" style={{ fontSize: ".77rem" }}>Preferred Wage per hour: {field.wagePerHour}</MDBCardText>
                      </div>
                    ))}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
