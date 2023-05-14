export default function Footer() {
    return (

        <div class="flex flex-col">
            <footer class="mt-auto p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://github.com/cseleven" class="hover:underline">Eleven</a>. SE, Computer Science, KMITL.
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="https://github.com/cseleven/Catfider-Front.git" class="mr-4 hover:underline md:mr-6">Frontend</a>
                    </li>
                    <li>
                        <a href="https://github.com/cseleven/Catfider-Front/tree/main/frontend/pages/api" class="mr-4 hover:underline md:mr-6">Backend</a>
                    </li>
                    <li>
                        <a href="https://github.com/cseleven" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </footer>
        </div>
    );
}