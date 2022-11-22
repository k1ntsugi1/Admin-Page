import React from "react";
import { IComment } from "../../store/slices/Comments/fetchGetComments";
import { Card } from 'react-bootstrap';
interface IProps {
    comment: IComment
}

export const CardOfComment: React.FC<IProps> = ({comment}) => {
    return (
        <Card className="ms-1 p-2 w-100 border-0 rounded-0">
            <Card.Body className="border-start border-bottom">
                <Card.Title>{comment?.name}</Card.Title>
                <Card.Subtitle className="text-muted">{comment?.email}</Card.Subtitle>
                <Card.Text>{comment?.body}</Card.Text>
            </Card.Body>
        </Card>
    )
}