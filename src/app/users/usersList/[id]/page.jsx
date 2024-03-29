"use client";

import { useFetchUserDetailsQuery } from "@/redux/store";
import Image from "next/image";
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
import dersigoUser from "../../../../asset/images/dersigoUser.png";

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

  const picture =
    data && data.picture && data.picture != null ? (
      <MDBCardImage
        src={data.picture}
        alt="Avatar"
        className="my-5 mx-auto rounded-full"
        style={{ width: "120px" }}
        fluid
      />
    ) : (
      <Image
        src={dersigoUser}
        alt="Avatar"
        className="my-5 mx-auto rounded-full"
        width={120}
      />
    );
  const state =
    data &&
    data.location &&
    data.location.state != null &&
    data.location.state != ""
      ? data.location.state
      : "Unknown";
  const country =
    data &&
    data.location &&
    data.location.country != null &&
    data.location.country != ""
      ? data.location.country
      : "Unknown";
  const gender =
    data && data.gender && data.gender != null
      ? capitalizeAllWords(data.gender)
      : "Unknown";
  const dateOfBirth =
    data && data.dateOfBirth && data.dateOfBirth != null
      ? formatDate(data.dateOfBirth)
      : "Unknown";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col border bg-[#f4f5f7] border-[#f4f5f7] shadow-sm rounded-sm mb-3 relative">
        <div className="md:flex justify-between items-center space-x-2 my-2">
          <div className="text-blue-600 text-xl ml-3 font-medium">
            User Details
          </div>
        </div>
      </div>
      {error && (
        <div className="text-red-500 font-bold p-4">
          Error loading data. Please try again.
        </div>
      )}
      {isFetching ? (
        <div className="flex flex-col border bg-[#f4f5f7] border-[#f4f5f7] shadow-sm rounded-sm mb-3 relative">
          <div className="p-3">
            <div className="flex animate-pulse">
              <div className="ml-4 mt-2 w-full">
                <ul className="space-y-3">
                  <li className="w-full h-12 bg-gray-200 rounded-sm"></li>
                  <li className="w-full h-12 bg-gray-200 rounded-sm"></li>
                  <li className="w-full h-12 bg-gray-200 rounded-sm"></li>
                  <li className="w-full h-12 bg-gray-200 rounded-sm"></li>
                  <li className="w-full h-12 bg-gray-200 rounded-sm"></li>
                  <li className="w-full h-12 bg-gray-200 rounded-sm"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                      {picture}
                      <MDBTypography tag="h5">
                        {data.firstName} {data.lastName}
                      </MDBTypography>
                      <MDBCardText>
                        {state}, {country}
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
                              {gender}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6" className="font-semibold">
                              Date of Birth
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {dateOfBirth}
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
      )}
    </div>
  );
};

export default UserDetails;
