import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
export function throttler(observable, throttleTime) {
    var subj = new Subject();
    var timeout = false;
    var allowed = true;
    observable.subscribe(function (e) {
        timeout && clearTimeout(timeout);
        if (allowed) {
            allowed = false;
            subj.next(e);
        }
        timeout = window.setTimeout(handler, throttleTime);
        function handler() {
            allowed = true;
        }
    });
    return subj.pipe(share());
}
