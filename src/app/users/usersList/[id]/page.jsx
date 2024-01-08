"use client";

import { useFetchUserDetailsQuery } from "@/redux/store";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

const UserDetails = ({ params }) => {
  const id = params.id;
  const { data, error, isFetching } = useFetchUserDetailsQuery(id);

  // TARİH FORMAT DEĞİŞİKLİĞİ
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const date = new Date(dateString);
    return date
      .toLocaleDateString("tr-TR", options)
      .replace(".", "/")
      .replace(".", "/");
  };

  // KELİMELERİN İLK HARFLERİNİ BÜYÜK YAPAR
  function capitalizeAllWords(str) {
    return str
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className={`gradient-custom text-center ${
                      data.gender === "female"
                        ? "bg-pink-200"
                        : data.gender === "male"
                        ? "bg-blue-300"
                        : ""
                    } text-white flex flex-col justify-items-center`}
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src={data.picture}
                      alt="Avatar"
                      className="my-5 mx-auto rounded-full"
                      style={{ width: "120px" }}
                      fluid
                    />
                    <MDBTypography tag="h5">
                      {data.firstName} {data.lastName}
                    </MDBTypography>
                    <MDBCardText>
                      {data.location.state}, {data.location.country}
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6" className="font-bold">
                        Information
                      </MDBTypography>
                      <hr className="mt-0 mb-2" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6" className="font-semibold">
                            Gender
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {capitalizeAllWords(data.gender)}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6" className="font-semibold">
                            Date of Birth
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {formatDate(data.dateOfBirth)}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6" className="font-semibold">
                            Phone
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {data.phone}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6" className="font-semibold">
                            Email
                          </MDBTypography>
                          <MDBCardText className="text-muted overflow-hidden whitespace-nowrap text-ellipsis cursor-default">
                            {data.email}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBTypography tag="h6" className="font-bold mt-2">
                        Registration
                      </MDBTypography>
                      <hr className="mt-0 mb-2" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6" className="font-semibold">
                            Registered Date
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {formatDate(data.registerDate)}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6" className="font-semibold">
                            Updated Date
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {formatDate(data.updatedDate)}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }

  return null;
};

export default UserDetails;
