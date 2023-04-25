import { router, dom } from '@artevelde-uas/canvas-lms-app';

import t from './i18n';


export default function ({ expandMyFilesMenu = true } = {}) {
    router.onRoute(['profile.files', 'groups.files', 'courses.files'], async (params, name) => {

        // Fix breadcrumbs
        dom.onElementReady('.ic-Layout-contentMain .ic-app-nav-toggle-and-crumbs--files').then(navToggleAndCrumbs => {
            const wrapper = document.getElementById('wrapper');

            // Remove class name
            navToggleAndCrumbs.classList.remove('ic-app-nav-toggle-and-crumbs--files');

            // Move breadcrumbs back to original location
            wrapper.insertBefore(navToggleAndCrumbs, wrapper.firstChild);
        });

        if (name === 'profile.files') {
            const profileLink = document.getElementById('global_nav_profile_link');
            const dashboardLink = document.getElementById('global_nav_dashboard_link');
            const profileListItem = profileLink.parentNode;
            const dashboardListItem = dashboardLink.parentNode;

            // Mark the account menu as expanded
            if (expandMyFilesMenu) {
                document.body.classList.add('course-menu-expanded');
            }

            // Fix wrongly selected dashboard link
            dom.onClassAdded(dashboardListItem, (...attrs) => {
                // Change selected item back to profile link
                dashboardListItem.classList.remove('ic-app-header__menu-list-item--active');
                dashboardListItem.removeAttribute('aria-current');
                profileListItem.classList.add('ic-app-header__menu-list-item--active');
                profileListItem.setAttribute('aria-current', 'page');
            }, {
                filter: 'ic-app-header__menu-list-item--active'
            });

            const navigationTray = document.getElementById('nav-tray-portal');

            // Temporarily hide the navigation tray
            navigationTray.hidden = true;

            // Click on the profile link to render the profile navigation tray
            profileLink.click();

            // Wait for the links to render
            const profileTray = await dom.onElementReady('.profile-tray ul', { root: navigationTray });
            await dom.onElementReady('li > div > a', { root: profileTray });
            const links = profileTray.querySelectorAll('li > div > a');

            // Close the navigation tray
            profileLink.click();

            // Unhide the navigation tray after the transition
            setTimeout(() => {
                navigationTray.hidden = false;
            }, 1000);

            // Indicate that left side is present
            document.body.classList.add('with-left-side');

            // Insert the markup for the left side menu
            document.getElementById('not_right_side').insertAdjacentHTML('beforebegin', `
                <div id="left-side" class="ic-app-course-menu ic-sticky-on list-view" style="display: ${expandMyFilesMenu ? 'block' : 'none'}">
                    <div id="sticky-container" class="ic-sticky-frame has-scrollbar">
                        <nav role="navigation" aria-label="Menu Accountnavigatie">
                            <ul id="section-tabs">
                            </ul>
                        </nav>
                    </div>
                </div>
            `);

            const sectionTabs = document.getElementById('section-tabs');

            // Loop over each link and generate menu item
            links.forEach(link => {
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');

                listItem.className = 'section';
                anchor.href = link.getAttribute('href');
                anchor.title = link.textContent;
                anchor.tabIndex = 0;
                anchor.textContent = link.textContent;

                // Select the current active page
                if (link.href === window.location.href) {
                    anchor.classList.add('files', 'active');
                    anchor.setAttribute('aria-current', 'page');
                }

                listItem.appendChild(anchor);
                sectionTabs.appendChild(listItem);
            });
        }
    });

    return {
        ...require('../package.json'),
        title: t('package.title'),
        description: t('package.description')
    };
}
