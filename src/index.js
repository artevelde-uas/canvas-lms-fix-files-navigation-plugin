
export default function (app) {
    app.addRouteListener([
        'profile.files',
        'groups.files',
        'courses.files'
    ], () => {
        Promise.all([
            app.addReadyListener('.ic-Layout-contentMain .ic-app-nav-toggle-and-crumbs--files'),
            app.addReadyListener('.ic-Layout-contentMain .ic-app-nav-toggle-and-crumbs--files + .ic-app-crumbs')
        ]).then(([navToggleAndCrumbs, crumbs]) => {
            var wrapper = document.getElementById('wrapper');
            var courseMenuToggle = document.getElementById('courseMenuToggle');

            // Remove class name
            navToggleAndCrumbs.classList.remove('ic-app-nav-toggle-and-crumbs--files');
            
            // Move elements back to original location
            wrapper.insertBefore(navToggleAndCrumbs, wrapper.firstChild);
            navToggleAndCrumbs.insertBefore(crumbs, courseMenuToggle.nextSibling);
        });
    });
}
