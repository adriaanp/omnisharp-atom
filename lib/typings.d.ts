/// <reference path="../typingsTemp/atom/atom.d.ts" />
declare module OmniSharp {
    interface IFeature {
        activate(): void;
        dispose(): void;
    }

    interface IAtomFeature extends IFeature {
        attach(): void;
    }

    interface ICompletionResult {
        word: string;
        prefix: string;
        renderLabelAsHtml: boolean;
        label: string;
    }

    interface VueArray<T> extends Array<T> {
        $remove(index: number);
    }

    interface OutputMessage {
        message: string;
        logLevel?: string;
    }

    interface ExtendApi extends OmniSharp.Api {
        makeRequest(editor?: Atom.TextEditor, buffer?: TextBuffer.TextBuffer): OmniSharp.Models.Request;
        makeDataRequest<T>(data: T, editor?: Atom.TextEditor, buffer?: TextBuffer.TextBuffer): T;
    }

    interface IProjectViewModel {
        name: string;
        path: string;
        frameworks: string[];
        configurations: string[];
        commands: { [key: string]: string };
    }

}

declare module Rx {
    interface ObjectObserveChange<T> {
        type: string;
        object: T;
        name: string;
        oldValue?: any;
    }

    interface ArrayObserveChange<T> {
        type: string;
        object: T[];
        name?: string;
        oldValue?: T;
        index?: number;
        removed?: T[];
        added?: number;
    }

    interface ObservableStatic {
        ofObjectChanges<T>(obj: T): Observable<ObjectObserveChange<T>>;
        ofArrayChanges<T>(obj: T): Observable<ArrayObserveChange<T>>;
    }

    interface Observable<T> {
        throttleFirst(windowDuration: number, scheduler?: Rx.Scheduler);
    }
}
