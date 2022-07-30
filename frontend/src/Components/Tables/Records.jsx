import React from 'react';
import { DataGrid, GridActionsCellItem, } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

const url_record = "https://shikinserezha.pythonanywhere.com/api/record/";


class Records extends React.Component{
    state = {
        todos: [],
        error: ""
    }

    DeleteRecord = async (id) => {
        try{
            const response = await fetch(url_record + id + '/', {
                method: "DELETE",
                headers:{
                    'Authorization': 'Token ' + this.props.token
                }
            });
            await this.componentDidMount();
        }catch (e){
            this.setState({
                    error: "Ошибка!!!"
                }
            )
        }
    }

    columns =  [
        {
            field: 'title',
            headerName: 'Заголовок',
            width: 150
        },
        {
            field: 'content',
            headerName: 'Контент',
            width: 400
        },
        {
            field: 'time_create',
            headerName: 'Время создания',
            width: 260
        },
        {
            field: 'record',
            headerName: 'Автор'
        },
        {
            field: 'tag_record',
            headerName: 'Тег'
        },
        {
            field: 'actions',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem icon={<DeleteIcon />} onClick={this.DeleteRecord.bind(this, params.id)} label="Delete" />
            ]
        }

    ]

    componentDidMount = async () => {
        let todos = []
        try {
            const response = await fetch(url_record, {
                method: "GET",
                headers:{
                    'Authorization': 'Token ' + this.props.token
                }
            })
            todos = await response.json();
        } catch (e){
            this.setState({
                error: "Ошибка получения данных"
            })
        }

        this.setState({
            todos,
        })
    }


    render(){
        const {error, todos} = this.state;
        return <div className='records'>
            <div><h1 className="h1">Records</h1></div>
            <h2>{error}</h2>
            <DataGrid rows={todos} columns={this.columns} pageSize={5} rowsPerPageOptions={[5]}/>
        </div>
    }
}

export default Records;