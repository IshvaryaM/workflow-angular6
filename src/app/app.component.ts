import { Component } from '@angular/core';
import { WorkflowNode, WorkflowConnection } from './models/workflow-models';

@Component({
    selector: 'app-root',
    template: `
        <ng-workflow
                [lineColor]="'navy'"
                [nodes]="nodes"
                [allowCircular]="false"
                [connections]="connections"></ng-workflow>
    `,
    styles: []
})
export class AppComponent {

    nodes: WorkflowNode[] = [];
    connections: WorkflowConnection[] = [];


    constructor() {

        this.nodes = [{
            "title": "Step 1",
            "subHeader": "Thaw",
            "parameters": "1",
            "status": "completed",
            "id": "step1",
            "x": 548,
            "y": 10
        }, {
            "title": "Step 2",
            "subHeader": "Shake flask expansion",
            "parameters": "2",
            "status": "inProgress",
            "id": "step2",
            "x": 548,
            "y": 190
        }, {
            "title": "Step 3",
            "id": "step3",
            "subHeader": "Production BioReactor",
            "parameters": "3",
            "status": "notStarted",
            "x": 548,
            "y": 350
        },{
            "title": "Step 4",
            "id": "step4",
            "subHeader": "Production BioReactor 2",
            "parameters": "3",
            "status": "notStarted",
            "x": 548,
            "y": 500
        }];

        this.connections.push({
            from: this.nodes[0],
            to: this.nodes[1],
            title: '',
            fromSide: 'bottom',
            toSide: 'top',
            color: 'navy'
        })

        this.connections.push({
            from: this.nodes[1],
            to: this.nodes[2],
            title: '',
            fromSide: 'bottom',
            toSide: 'top',
        })


        this.connections.push({
            from: this.nodes[2],
            to: this.nodes[3],
            fromSide: 'bottom',
            toSide: 'top',
            title: '',
        })


        // this.connections.push({
        //     from: this.nodes[1],
        //     to: this.nodes[4],
        //     fromSide: 'right',
        //     toSide: 'bottom',
        //     title: 'Verify to finish',
        // })


        // this.connections.push({
        //     from: this.nodes[2],
        //     to: this.nodes[3],
        //     fromSide: 'right',
        //     toSide: 'left',
        //     title: 'Test to review',
        // })

    }
}
