<script lang="ts">
	import { createDialog } from 'svelte-headlessui'
	import Transition from 'svelte-transition'

	const dialog = createDialog({ label: 'Payment Success' })
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="flex w-full flex-col items-center justify-center">
		<div class="flex items-center justify-center">
			<button
				type="button"
				on:click={dialog.open}><div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <svg class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
                    </svg>
                    <a href="/">
                        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need any help purchasing your tickets?</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Go to this step by step guideline process on how to enter a queue and start purchasing your tickets</p>
                </div></button
			>
		</div>
	</div>

	<div class="relative z-10">
		<Transition show={$dialog.expanded}>
			<Transition
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div class="fixed inset-0 bg-black bg-opacity-25" on:click={dialog.close} />
			</Transition>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<Transition
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all" use:dialog.modal>
							<h3 class="text-lg font-medium leading-6 text-gray-900">How to Purchase Your Ticket</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									First, click on the concert you wish to go to. Then, click on queue. Some queues may open earlier than others. Wait patiently for your time to purchase the tickets and go ahead with purchasing!
								</p>
                                <p class="text-sm text-gray-500">
									Need more help? Go to our <a href="#" class="dark:text-blue-500 hover:underline">FAQ page</a>!
								</p>
							</div>

							<div class="mt-4">
								<button
									type="button"
									class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
									on:click={dialog.close}
								>
									Got it, thanks!
								</button>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</Transition>
	</div>
</div>