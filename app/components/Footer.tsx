
import { MessageSquare, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                RejectMe
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Rejection is better than ghosting.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>AI Generator </li>
              <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
             {/*<li><a href="#" className="hover:text-white transition-colors">Rate Templates</a></li>*/}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/Rabdeep790" className="text-white hover:text-green transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/rabdeep-kaur-35a26925b" className="text-white hover:text-green transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/RabdeepKaur" className="text-white hover:text-green transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="rabdeep0202@gmail.com" className="text-white hover:text-green transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 RejectMe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
