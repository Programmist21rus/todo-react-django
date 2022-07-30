import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const url_record = "https://shikinserezha.pythonanywhere.com/api/record/";
const url_author = "https://shikinserezha.pythonanywhere.com/api/author/";
const url_tagRecord = "https://shikinserezha.pythonanywhere.com/api/tag-record/";

class NewRecord extends React.Component {
    state = {
        create_success: undefined,
        authors: [],
        tagRecords: [],
    }

    get_authors = async () => {
        try {
            const response = await fetch(url_author, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.props.token
                },
            })
            let temp_authors = await response.json();
            this.setState({authors: temp_authors});
        } catch (e) {
            this.setState({
                error: "Ошибка!!!"
            })
        }
    }

    get_tagRecord = async () => {
        try {
            const response = await fetch(url_tagRecord, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.props.token
                },
            })
            let temp_tagRecords = await response.json();
            this.setState({tagRecords: temp_tagRecords});
        } catch (e) {
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }

    regRecord = async () => {
        let title = this.title.value;
        let content = this.content.value;
        let record = this.author.value;
        let tag_record = this.tagrecord.value;
        try {
            const response = await fetch(url_record, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.props.token
                },
                body: JSON.stringify({
                    'title': title,
                    'content': content,
                    'record': record,
                    'tag_record': tag_record
                })
            })
            let temp = await response.json();
            if (response.ok) {
                this.setState({create_success: true})
            } else {
                console.log(temp);
                this.setState({create_success: false})
            }

        } catch (e) {
            this.setState({
                error: "Ошибка получения данных"
            })
        }
    }

    componentDidMount = async () => {
        await this.get_authors();
        await this.get_tagRecord();
    }

    render() {
        let {create_success} = this.state;

        return (
            <div className="leftmodal">
                <div><h1 className="h1">Новая запись</h1></div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Введите заголовок"
                                      ref={ref => this.title = ref}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Контент</Form.Label>
                        <Form.Control as="textarea" name="content" rows={3}
                                      ref={ref => this.content = ref}/>
                    </Form.Group>

                    <Form.Label>Автор</Form.Label>
                    <Form.Select className="mb-4" aria-label="Default select example" ref={ref => this.author = ref}>
                        {this.state.authors.map((data) => (
                            <option value={data.id}>{data.name}</option>
                        ))}
                    </Form.Select>

                    <Form.Label>Тег</Form.Label>
                    <Form.Select className="mb-4" aria-label="Default select example" ref={ref => this.tagrecord = ref}>
                        {this.state.tagRecords.map((data) => (
                            <option value={data.id}>{data.title}</option>
                        ))}
                    </Form.Select>

                    <Button onClick={this.regRecord} variant="primary">
                        Создать
                    </Button>

                    {create_success ? <div className="create_success"><p>Запись добавлена!</p></div> :
                        <div></div>
                    }
                </Form>
            </div>
        )
    }
}

export default NewRecord;