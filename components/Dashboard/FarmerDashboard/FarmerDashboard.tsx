'use client';

import React, { useMemo, useState } from 'react';
import { Users, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import Overview from './Overview/Overview';
import AnimalsTab from './FarmAnimals/Animals';
import TreatmentsTab from './Treatments/Treatments';

interface Animal {
	id: string;
	name: string;
	type: string;
	breed: string;
	age: string;
	weight: string;
	lastTreatment: string;
	nextCheckup: string;
	lastCheckup: string;
	status: 'safe' | 'warning' | 'not-safe';
}

interface TreatmentLog {
	id: string;
	animalId: string;
	medicine: string;
	date: string;
	veterinarian: string;
	notes?: string;
}

const mockAnimals: Animal[] = [
	{
		id: 'CT001',
		name: 'Dairy Cow #1',
		type: 'Cattle',
		breed: 'Holstein Friesian',
		age: '3 years',
		weight: '450 kg',
		lastTreatment: '2024-01-15',
		nextCheckup: '2024-02-20',
		lastCheckup: '2024-01-15',
		status: 'safe',
	},
	{
		id: 'CT002',
		name: 'Dairy Cow #2',
		type: 'Cattle',
		breed: 'Jersey',
		age: '2 years',
		weight: '380 kg',
		lastTreatment: '2024-01-20',
		nextCheckup: '2024-02-15',
		lastCheckup: '2024-01-20',
		status: 'warning',
	},
	{
		id: 'PL001',
		name: 'Pig #1',
		type: 'Pig',
		breed: 'Large White',
		age: '1 years',
		weight: '120 kg',
		lastTreatment: '2024-01-10',
		nextCheckup: '2024-02-10',
		lastCheckup: '2024-01-10',
		status: 'safe',
	},
];

const mockTreatments: TreatmentLog[] = [
	{ id: 'TR001', animalId: 'CT001', medicine: 'Amoxicillin', date: '2024-01-22', veterinarian: 'Dr. Rao', notes: 'Completed; withdrawal 7 days' },
	{ id: 'TR002', animalId: 'CT002', medicine: 'Ivermectin', date: '2024-01-25', veterinarian: 'Dr. Singh' },
];

export const FarmerDashboard: React.FC = () => {
	const [activeTab, setActiveTab] = useState<'overview' | 'animals' | 'treatments'>('overview');
	const [animals] = useState<Animal[]>(mockAnimals);
	const [treatments] = useState<TreatmentLog[]>(mockTreatments);

	const getStatusStats = () => {
		const total = animals.length;
		const safe = animals.filter((a) => a.status === 'safe').length;
		const warning = animals.filter((a) => a.status === 'warning').length;
		const notSafe = animals.filter((a) => a.status === 'not-safe').length;
		return { total, safe, warning, notSafe };
	};

	const stats = getStatusStats();
	const recentActivity = useMemo(
		() => [
			{ id: 'ac1', type: 'success' as const, title: 'Treatment complete for CT001', detail: 'Amoxicillin administered · Safe Date: 2024-01-22' },
			{ id: 'ac2', type: 'warning' as const, title: 'Checkup Reminder for CT002', detail: 'Next checkup due on 2024-02-15' },
		],
		[]
	);

	return (
		<div className="min-h-screen bg-green-50 rounded-2xl p-8">
			<div className="max-w-7xl mx-auto">
			<div className="mb-10 text-center">
				<h2 className="text-4xl font-bold text-green-800">Farmer Dashboard</h2>
				<p className="text-green-600 mt-2">Manage your livestock and track medicine compliance</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
				<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center justify-between transition-transform duration-200 ease-in-out hover:scale-105">
					<div className="flex items-center">
						<div className="p-3 bg-blue-100 rounded-full"><Users className="h-7 w-7 text-blue-600" /></div>
						<div className="ml-4">
							<p className="text-md font-medium text-gray-600">Total Animals</p>
							<p className="text-3xl font-bold text-gray-900">{stats.total}</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center justify-between transition-transform duration-200 ease-in-out hover:scale-105">
					<div className="flex items-center">
						<div className="p-3 bg-green-100 rounded-full"><CheckCircle className="h-7 w-7 text-green-600" /></div>
						<div className="ml-4">
							<p className="text-md font-medium text-gray-600">Safe</p>
							<p className="text-3xl font-bold text-gray-900">{stats.safe}</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center justify-between transition-transform duration-200 ease-in-out hover:scale-105">
					<div className="flex items-center">
						<div className="p-3 bg-yellow-100 rounded-full"><AlertTriangle className="h-7 w-7 text-yellow-600" /></div>
						<div className="ml-4">
							<p className="text-md font-medium text-gray-600">Under Observation</p>
							<p className="text-3xl font-bold text-gray-900">{stats.warning}</p>
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center justify-between transition-transform duration-200 ease-in-out hover:scale-105">
					<div className="flex items-center">
						<div className="p-3 bg-red-100 rounded-full"><XCircle className="h-7 w-7 text-red-600" /></div>
						<div className="ml-4">
							<p className="text-md font-medium text-gray-600">Not Safe</p>
							<p className="text-3xl font-bold text-gray-900">{stats.notSafe}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
				<div className="border-b border-gray-200 px-6 sm:px-8">
					<nav className="-mb-px flex space-x-8" aria-label="Tabs">
						{
							(
								[
									{ id: 'overview', label: 'Overview' },
									{ id: 'animals', label: 'Animals' },
									{ id: 'treatments', label: 'Treatments' },
								] as const
							).map((t) => (
								<button
									key={t.id}
									onClick={() => setActiveTab(t.id)}
									className={`py-4 px-1 text-base font-medium border-b-2 transition-colors duration-200 ease-in-out ${
										activeTab === t.id ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
									}`}
								>
									{t.label}
								</button>
							))}
					</nav>
				</div>

				<div className="p-6 sm:p-8">
					{activeTab === 'overview' && <Overview recentActivity={recentActivity} animals={animals} treatments={treatments} />}
					{activeTab === 'animals' && <AnimalsTab animals={animals} treatments={treatments} />}
					{activeTab === 'treatments' && <TreatmentsTab treatments={treatments} animals={animals} />}
				</div>
			</div>
		</div>
	</div>
	);
};

export default FarmerDashboard;