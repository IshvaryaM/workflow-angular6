import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { WorkflowNode, WorkflowConnection, Workflow } from '../../models/workflow-models';
import { _ParseAST } from '@angular/compiler';

@Component({
    selector: 'ng-workflow',
    templateUrl: 'workflow.component.html',
    styleUrls: ['workflow.component.scss']
})

export class WorkflowComponent implements OnInit {

    @Input() public nodes: WorkflowNode[];
    @Input() public connections: WorkflowConnection[];
    @Input() workflow: Workflow;
    @Input() gridSize: number = 10;
    @Input() lineColor = 'darkgray';


    // Do not allow connection from same node it itself
    // and also prevent circular dependency
    // Example: if A → B. them B → A is not allowed.
    // However, B → C → A will be allowed
    @Input() allowCircular = false;

    activeNode:any;
    header:string;
    subheader:string;
    parameters:String;
    status:String;

    constructor() { }

    ngOnInit() {
        this.workflow = new Workflow();
        this.workflow.allowCircular = this.allowCircular;
        this.workflow.nodes = this.nodes;
        this.workflow.connections = this.connections;
    }

    discardConnection () {
        this.workflow.discardCurrentConnection();
    }

    addNode() {
        let oldNodes = this.nodes;
        this.nodes = [];
        oldNodes.unshift ({
            "title": "Step N",
            "subHeader": "sub header",
            "parameters": "0",
            "status": "completed",
            "id": "stepN",
            "x": 548
        });

        if (oldNodes.length > 1) {
            this.connections.push({
                from: oldNodes[0],
                to: oldNodes[1],
                title: '',
                fromSide: 'bottom',
                toSide: 'top',
                color: 'navy'
            });
        }
        const x = 548;
        let y = 9;
        oldNodes.forEach((node, index) => {
             const stepC = index+1;
             node.title = 'Step '+stepC;
             node.id = 'Step'+stepC;
             node.x = x;
             node.y = y;
             y = y + 150;
        });
        this.workflow.nodes = [];
        this.workflow.connections = [];
        setTimeout(() => {
            this.nodes = oldNodes;
        this.workflow.nodes = this.nodes;
        this.workflow.connections = this.connections;
        }, 0);
        
    }
    getClickEvent(e: WorkflowConnection | WorkflowNode) {
        if (e.click) {
            return e.click(e);
        }
        return () => {};
    }

    
    openDialog (node) {
        this.activeNode = node;
        document.getElementById("mySidenav").style.width = "25%";
        document.getElementById("main").style.width= "75%";
        this.header = node.title;
        this.subheader = node.subHeader;
        this.parameters = node.parameters;
        this.status = node.status;
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.width= "100%";
    }

    updateNode() {
        this.nodes.forEach(node => {
            if(node.title === this.activeNode.title) {
                node.title = this.header;
                node.subHeader = this.subheader;
                node.parameters = this.parameters;
            }
        });
    }
}

