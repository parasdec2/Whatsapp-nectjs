import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";
import { useState } from "react";

const ReadMore = ({ children }) => {
  var text = children;
  const [isReadMore, setIsReadMore] = useState(children.length > 500);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 500) : text}
      {children.length > 500 && (
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={toggleReadMore}
          className="read-or-hide"
        >
          {isReadMore ? "...read more" : " show less"}
        </span>
      )}
    </p>
  );
};

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);
  const router = useRouter();
  var bytes = CryptoJS.AES.decrypt(message.message, router.query.id);
  var messageContent = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

  const [isReadMore, setIsReadMore] = useState(messageContent.length > 500);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <Container>
      <TypeOfMessage>
        {isReadMore ? messageContent.slice(0, 500) : messageContent}
        {messageContent.length > 500 && (
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={toggleReadMore}
          >
            {isReadMore ? "...read more" : " show less"}
          </span>
        )}
        {/* <ReadMore>{messageContent}</ReadMore> */}
        {/* {readMore && <span>Read More</span>}
        {readLess && <span>Read Less</span>} */}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  max-width: 90vh;
  word-wrap: break-word;
  padding-bottom: 26px;
  position: relative;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
  border-top-right-radius: 0px;

  :after {
    content: " ";
    position: absolute;
    right: -15px;
    top: 0;
    border-top: 15px solid transparent;
    border-right: none;
    border-left: 15px solid #dcf8c6;
    border-bottom: 15px solid transparent;
  }
`;

const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
  border-top-left-radius: 0px;

  :after {
    content: " ";
    position: absolute;
    left: -15px;
    top: 0;
    border-top: 15px solid transparent;
    border-right: 15px solid whitesmoke;
    border-left: none;
    border-bottom: 15px solid transparent;
  }
`;

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
