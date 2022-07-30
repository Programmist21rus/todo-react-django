import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const url_tagRecord = "https://shikinserezha.pythonanywhere.com/api/tag-record/";

class NewTag extends React.Component{
    state = {
        create_success: undefined,
    }

    newTagRecord = async () => {
        let title = this.title.value;
        let content = this.content.value;
        try{
            const response = await fetch(url_tagRecord, {
                method: "POST",
                headers: { 'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.props.token },
                body: JSON.stringify({
                    'title': title,
                    'content': content
                })
            })
            let temp = await response.json();
            if ('id' in temp){
                this.setState({create_success: true})
            }
            else{
                console.log(temp);
                this.setState({create_success: false})
            }

        }catch (e){
            this.setState({
                error: "Ошибка!!!"
            })
        }
    }


    render(){
        let {create_success} = this.state;
        return (
            <div className="leftmodal">
                <div><h1 className="h1">Новый тег</h1></div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Введите название" ref={ref => this.title = ref}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Контент</Form.Label>
                        <Form.Control as="textarea" name="content" rows={3}
                                      ref={ref => this.content = ref}/>
                    </Form.Group>
                    <Button onClick={this.newTagRecord} variant="primary">
                        Создать
                    </Button>
                    {create_success ? <div className="create_success"><p>Тег добавлен!</p></div> :
                        <div></div>
                    }
                </Form>
            </div>
        )
    }
}

export default NewTag;