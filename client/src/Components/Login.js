import React from "react";
import { connect } from "react-redux";
import "../Stylesheets/login.css";
import {
    Modal,
    ModalBody,
    ModalHeader,
    UncontrolledCarousel,
} from "reactstrap";
import { items, contacts } from "../shared/carouselItems";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            isContactModalOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleContactModal = this.toggleContactModal.bind(this);
    }

    submitFeedback() {
        window.location.href = "/feedback";
    }

    gotologin() {
        console.log("Clicked");
        window.location.href = "/adminlogin";
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    toggleContactModal() {
        this.setState({
            isContactModalOpen: !this.state.isContactModalOpen,
        });
    }

    render() {
        return (
            <div
                data-layer="7c5fe039-61b7-412a-8bd8-6980e141ecd1"
                class="web19201"
            >
                <div
                    data-layer="1abb2031-d4c0-4165-a2e6-c24a40546b39"
                    class="bphcUnite"
                >
                    <span class="bphcUnite-0">BPHC </span>
                    <span class="bphcUnite-5">Unite</span>
                </div>
                <div
                    data-layer="09b02fb1-e63f-46dd-a668-a99eb53d44fe"
                    class="aWebPlatformThatBringsTogetherStudentsAndIntegratesVariousFunctionalitiesNowCabSharingclubNoticesAndVariousOtherThingsAtOnePlace"
                >
                    A Web Platform that brings together students and integrates
                    various <br />
                    functionalities. Now cab sharing, club notices and various
                    other
                    <br />
                    things at one place!
                </div>
                <button
                    data-layer="70838121-41c1-4ee3-a151-efb117d58830"
                    class="rectangle1"
                >
                    View More
                </button>
                <div
                    data-layer="bf668dd1-0f5d-4604-8aa8-d65123232696"
                    class="rectangle2"
                ></div>
                <div
                    data-layer="1ab27cc1-9e48-41ec-b836-fce9c8058025"
                    class="rectangle3"
                ></div>
                <div
                    data-layer="2e6a0a11-d254-4ba7-8a3a-fbd637dcc089"
                    class="studentLogin"
                >
                    Student Login
                </div>
                <button
                    data-layer="a24b63a3-5b99-4c70-8b75-616ccf8ab9cb"
                    class="loginAsAdmin"
                    onClick={this.gotologin}
                >
                    Login as Admin
                </button>
                <button
                    data-layer="16af46dc-0c06-4cc2-9fc7-cb7818024444"
                    class="rectangle5"
                >
                    Home
                </button>
                <button
                    data-layer="6796f089-8564-4d71-a081-30980f257a62"
                    class="rectangle6"
                    onClick={this.toggleModal}
                >
                    Developers
                </button>
                <button
                    data-layer="15b84006-cb08-4799-aaf3-fc2598762f16"
                    className="rectangle7"
                    onClick={this.toggleContactModal}
                >
                    Contact
                </button>
                <a
                    data-layer="9c527eec-2e40-4551-afdf-5afcf345b641"
                    class="rectangle8"
                    href="/auth/google"
                ></a>
                <div
                    data-layer="4bc243ac-a273-4e21-ac98-980bd669f67c"
                    class="signInWithGoogle"
                >
                    Sign In with Google
                </div>
                <button
                    data-layer="22c82d5d-7ae7-4326-802b-0e7684d4ee92"
                    class="rectangle9"
                    onClick={this.submitFeedback}
                >
                    Feedback
                </button>
                <div
                    data-layer="858c4d8b-181e-4676-b19b-d86b89179c52"
                    class="icons8LondonCab641"
                ></div>
                <div
                    data-layer="ee3be183-94bb-4981-b694-7d13b2921c89"
                    class="icons8BuyForChange64"
                ></div>
                <div
                    data-layer="ca1fcfd2-19b2-4505-8858-806a240d975f"
                    class="icons8Monday64"
                ></div>
                <div
                    data-layer="4e285ec4-e84d-4859-a988-96f1908f94da"
                    class="icons8Paper64"
                ></div>
                <div
                    data-layer="5698ef36-c80b-46b4-a2d8-85bb94237ba5"
                    class="cabSharing"
                >
                    Cab Sharing
                </div>
                <div
                    data-layer="78718413-2dd9-494a-af64-846c9d65b300"
                    class="personalCalendar"
                >
                    Personal Calendar
                </div>
                <div
                    data-layer="d9aec28c-8f91-40bc-9bee-23ebb33bf481"
                    class="buyAndSell"
                >
                    Buy and Sell
                </div>
                <div
                    data-layer="ca6dd340-e047-4aa5-83e1-c81eadc8eac0"
                    class="clubNotices"
                >
                    Club Notices
                </div>
                <div
                    data-layer="b5dd896e-b13c-404f-ab65-a27d50e3a43b"
                    class="clickIconsForMoreDetails"
                >
                    Click icons for more details
                </div>
                <div
                    data-layer="a137f89e-cfa5-44bb-9b12-d69ac6a18798"
                    class="icons8Teamwork641"
                ></div>
                <div
                    data-layer="caf91e3e-e2c4-4247-809c-d21a6914ba95"
                    class="topIdeas"
                >
                    Top Ideas
                </div>
                <div
                    data-layer="ba2df682-43ea-4921-b9bb-59afd5707df6"
                    class="icons8Google48"
                ></div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Developers of BPHC Unite
                    </ModalHeader>
                    <ModalBody>
                        <UncontrolledCarousel
                            items={items}
                        ></UncontrolledCarousel>
                    </ModalBody>
                </Modal>
                <Modal
                    isOpen={this.state.isContactModalOpen}
                    toggle={this.toggleContactModal}
                >
                    <ModalHeader toggle={this.toggleContactModal}>
                        Contacts
                    </ModalHeader>
                    <ModalBody>
                        <ul>
                            {contacts[0].name}
                            <br></br>
                            {contacts[0].email}
                            <br></br>
                            {contacts[0].phone}
                            <br></br>
                            <br></br>
                            {contacts[1].name}
                            <br></br>
                            {contacts[1].email}
                            <br></br>
                            {contacts[1].phone}
                            <br></br>
                            <br></br>
                            {contacts[2].name}
                            <br></br>
                            {contacts[2].email}
                            <br></br>
                            {contacts[2].phone}
                            <br></br>
                            <br></br>
                            {contacts[3].name}
                            <br></br>
                            {contacts[3].email}
                            <br></br>
                            {contacts[3].phone}
                            <br></br>
                            <br></br>
                            {contacts[4].name}
                            <br></br>
                            {contacts[4].email}
                            <br></br>
                            {contacts[4].phone}
                        </ul>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps)(Login);
