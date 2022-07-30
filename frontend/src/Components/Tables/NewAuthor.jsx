import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const url_author = "https://shikinserezha.pythonanywhere.com/api/author/";

class NewAuthor extends React.Component {
    state = {
        create_success: undefined,
    }

    newAuthor = async () => {
        let name = this.name.value;
        let age = this.age.value;
        let is_student = this.isstudent.value;
        try {
            const response = await fetch(url_author, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.props.token
                },
                body: JSON.stringify({
                    'name': name,
                    'age': age,
                    'is_student': is_student
                })
            })
            let temp = await response.json();
            if ('id' in temp) {
                this.setState({create_success: true})
            } else {
                console.log(temp);
                this.setState({create_success: false})
            }

        } catch (e) {
            this.setState({
                error: "Ошибка!!!"
            })
        }
    }


    render() {
        let {create_success} = this.state;
        return (
            <div className="leftmodal">
                <div><h1 className="h1">Новый автор</h1></div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Введите имя" ref={ref => this.name = ref}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Возраст</Form.Label>
                        <Form.Control type="number" name="age" placeholder="Введите возраст"
                                      ref={ref => this.age = ref}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="Студент" ref={ref => this.isstudent = ref}/>
                    </Form.Group>
                    <Button onClick={this.newAuthor} variant="primary">
                        Создать
                    </Button>
                    {create_success ? <div className="create_success"><p>Автор добавлен!</p></div> :
                        <div></div>
                    }
                </Form>
            </div>
        )
    }
}

export default NewAuthor;