import React, { Component } from 'react';
import { Table } from 'reactstrap';
import './DataViewTable.css';
import ApiConfig from '../../config.json';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
        this.loadSensorsData();
    }

    async loadSensorsData() {
        const response = await fetch('http://' + ApiConfig.ApiAddress + ':' + ApiConfig.ApiPort + '/parametersTicker.json');
        const data = await response.json();
        this.setState({ data: data.result });
    }

    render() {
        const { data } = this.state;
        return (
            <div className="DataViewTable">
                {data ?
                    <div className="Tables">
                        <Table dark>
                            <tbody>
                                <tr>
                                    <td>Tzb  {data.t_zb === null ? "Err" : parseFloat(data.t_zb).toFixed(2)}</td>
                                    <td>Tot  {data.t_ot === null ? "Err" : parseFloat(data.t_ot).toFixed(2)}</td>
                                    <td>Tp1  {data.t_p1 === null ? "Err" : parseFloat(data.t_p1).toFixed(2)}</td>
                                    <td>Tp2  {data.t_p2 === null ? "Err" : parseFloat(data.t_p2).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Tp3  {data.t_p3 === null ? "Err" : parseFloat(data.t_p3).toFixed(2)}</td>
                                    <td>Tp4  {data.t_p4 === null ? "Err" : parseFloat(data.t_p4).toFixed(2)}</td>
                                    <td>L-P  {data.l_p === null ? "Err" : parseFloat(data.p_l).toFixed(2)}</td>
                                    <td>Tev  {data.t_ev === null ? "Err" : parseFloat(data.t_ev).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Tsh  {data.t_sh === null ? "Err" : parseFloat(data.t_sh).toFixed(2)}</td>
                                    <td>SH  </td>
                                    <td>H-P  {data.h_p === null ? "Err" : parseFloat(data.h_p).toFixed(2)}</td>
                                    <td>Tcon  </td>
                                </tr>
                                <tr>
                                    <td>Tsc  {data.t_sc === null ? "Err" : parseFloat(data.t_sc).toFixed(2)}</td>
                                    <td>Sc  </td>
                                    <td>Flow1  </td>
                                    <td>T1  </td>
                                </tr>
                                <tr>
                                    <td>T2  </td>
                                    <td>&Delta;t  </td>
                                    <td>P1  </td>
                                    <td>Flow2  </td>
                                </tr>
                                <tr>
                                    <td>T2</td>
                                    <td>&Delta;t  </td>
                                    <td>P2</td>
                                    <td>P  </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table dark>
                            <thead>
                                <tr>
                                    <th>CoP</th>
                                </tr>
                            </thead>
                        </Table>
                    </div>

                    :
                    <div>Loading...</div>
                }
            </div>)
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(() => {
                this.loadSensorsData();
            });
        }, 2500);
    }
    componentWillUnmount() {
        clearInterval(this.interval);

    }
    
}

