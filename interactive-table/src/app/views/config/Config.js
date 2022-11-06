import './config.css';
import Title from '../title/Title';
import Button from '../buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { configureTableInfo } from '../../store/order-store';
import Row from './Row';

export default function Config() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modes = ['customer', 'table']

    const [tableNumber, setTableNumber] = useState(1);
    const [mode, setMode] = useState('customer');
    const [tablePartitionNumber, setTablePartitionNumber] = useState(1);

    const validate = () => {
        dispatch(configureTableInfo({
            tableNumber: tableNumber,
            tablePartitionNumber: tablePartitionNumber
        }));

        const path = mode === 'customer' ? '/welcome' : '/status';
        navigate(path);
    }

    return (
        <div id="config-menu-container">
            <Title />

            <Row name='Table Number'>
                <input type='number' value={tableNumber} onChange={(e) => setTableNumber(parseInt(e.target.value))} />
            </Row>
            <Row name='Mode'>
                <div style={{ display: "inline" }}>
                    {
                        modes.map((value, index) =>
                            <div key={index}
                                 onClick={() => setMode(value)}
                                 className={mode === value ? "radio-btn selected" : "radio-btn"}>
                                {value}
                            </div>)
                    }
                </div>
            </Row>
            <Row name='Table Partition Number'>
                <input type='number' value={tablePartitionNumber} onChange={(e) => setTablePartitionNumber(parseInt(e.target.value))} />
            </Row>

            <footer>
                <Button id='validate-btn' onClick={validate}>Validate</Button>
            </footer>
        </div>
    )
}