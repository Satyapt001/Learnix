import mongoose from 'mongoose';
import User from './models/User.js';
import { MONGODB_URI } from './config/env.js';

async function createAndTestUser() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to DB');

        const testUser = {
            name: 'Satyapriya Tripathy',
            email: 'satyapt001@gmail.com',
            password: 'Satya@1234'
        };

        // Cleanup if exists
        await User.deleteOne({ email: testUser.email });
        console.log('🧹 Cleaned up any existing user');

        // Create user
        console.log('\n📝 Creating user...');
        const user = await User.create(testUser);
        console.log('✅ User created successfully!');
        console.log('   Name:', user.name);
        console.log('   Email:', user.email);
        console.log('   ID:', user._id);
        console.log('   Password hash:', user.password.substring(0, 20) + '...');

        // Test login
        console.log('\n🔐 Testing login...');
        const foundUser = await User.findOne({ email: testUser.email });

        if (!foundUser) {
            console.error('❌ User not found during login test!');
            return;
        }

        const isMatch = await foundUser.comparePassword(testUser.password);

        if (isMatch) {
            console.log('✅ LOGIN SUCCESS! Password verification passed.');
            console.log('\n📋 You can now use these credentials:');
            console.log('   Email: satyapt001@gmail.com');
            console.log('   Password: Satya@1234');
        } else {
            console.error('❌ LOGIN FAILED! Password mismatch.');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 11000) {
            console.error('   User already exists. Try deleting first.');
        }
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from DB');
    }
}

createAndTestUser();
